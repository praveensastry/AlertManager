import { Transform } from "stream";

class Parser extends Transform {
    constructor(options) {
        super({ objectMode: true });
        options = options || {};
        this._memory = '';
        this._emitInvalidLines = (options.emitInvalidLines || false);
    }

    _handleLines(lines, cb) {
        for (let i = 0; i < lines.length; i++) {
            if (lines[i] === '') continue
    
            let err = null, json = null;
            try {
                json = JSON.parse(lines[i]);
            } catch (_err) {
                _err.source = lines[i];
                err = _err;
            }
    
            if (err) {
                if (this._emitInvalidLines) {
                    this.emit('invalid-line', err);
                } else {
                    return cb(err);
                }
            } else {
                this.push(json);
            }
        }
    
        cb(null);
    }

    _transform(chunk, encoding, cb) {
        if (chunk === '\u0003') {
            process.exit();
        }
        
        const lines = (this._memory + chunk.toString()).split('\n');
        this._memory = lines.pop();
        this._handleLines(lines, cb);
    }

    _flush(cb) {
        if (!this._memory) {
            return cb(null);
        }
        const line = this._memory;
        this._memory = '';
        this._handleLines([line], cb);
    }
}

export default Parser;