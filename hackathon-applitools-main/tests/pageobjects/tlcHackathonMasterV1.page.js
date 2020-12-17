import Page from './page';

class TlcHackathonMaster extends Page {
    /**
     * define elements
     */
    get blackLabel() { return $('#LABEL__containerc__104') }
    get filterButton() { return $('#filterBtn') }
    get resetButton() { return $('#fresetBtn') }
    get appliAirNight() { return $('[alt="Appli Air x Night"]') }
    get productGrid() { return $('#product_grid') }


    /**
     * define or overwrite page methods
     */
    open(path) {
        super.open(path)
    }
    close() {
        super.close()
    }
}

export default new TlcHackathonMaster();
