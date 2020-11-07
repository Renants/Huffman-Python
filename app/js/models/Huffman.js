class Huffmen {
    countUpFrequencies(text) {
        let map = new Map();
        let queue = Array();
        for (let i = 0; i < text.length; i++) {
            let ch = text[i];
            if (!map.has(ch)) {
                map.set(ch, new Vertice(ch));
                queue.push(map.get(ch));
                map.get(ch).increment();
            }
            else {
                map.get(ch).increment();
            }
        }
        return queue.sort((x, y) => x.frequency() - y.frequency()).reverse();
    }
    buildTree(queue) {
        while (true) {
            let left = queue.pop();
            let rigth = queue.pop();
            let parent = new Vertice('Null', left, rigth);
            if (queue.length === 0) {
                return parent;
            }
            else {
                queue.push(parent);
                queue = queue.sort((x, y) => x.frequency() - y.frequency()).reverse();
            }
        }
    }
    buildMap() {
        let map = new Map();
        let path = '';
        this._root.addToMap(map, path);
        return map;
    }
    encode(text) {
        this._root = this.buildTree(this.countUpFrequencies(text));
        let map = this.buildMap();
        let data = '';
        for (let index = 0; index < text.length; index++) {
            let ch = text[index];
            data = data + map.get(ch);
        }
        return data;
    }
    decode(text) {
    }
}
