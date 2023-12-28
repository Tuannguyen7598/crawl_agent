
import Store from 'electron-store';
const store = new Store({fileExtension:"./filestorage"})

export default class SnsStorage {
    constructor(private sns: string, private session_id: string) {

    }

    set(key: string, value: any) {
        
        store.set(`/${this.sns}/${this.session_id}/${key}`, JSON.stringify(value));
    }

    get(key: string, default_val: any) {
        let res = store.get(`/${this.sns}/${this.session_id}/${key}`, JSON.stringify(default_val)) as string;
        return JSON.parse(res);
    }

    clear() {
        //TODO
    }
}