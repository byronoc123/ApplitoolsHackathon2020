export default class Page {
    open (path) {
        browser.url(path);
    }

    close() {
        browser.close()
    }
    delete() {
        browser.deleteSession();
    }
}
