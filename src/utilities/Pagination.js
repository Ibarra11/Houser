export default function Pagination(itemList, itemsPerPage) {
    this.itemList = itemList;
    this.itemsPerPage = itemsPerPage;
    this.numberOfPages = 0;
}

Pagination.prototype.displayItemsOnPage = function (pageIndex) {
    let startIndex = (pageIndex - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    let tempArr = [];
    for (let i = startIndex; i < endIndex; i++) {
        if (this.itemList[i]) {
            tempArr.push(this.itemList[i]);
        }
    }
    return tempArr;
}

Pagination.prototype.calculateNumOfPages = function () {
    this.numberOfPages = Math.ceil(this.itemList.length / this.itemsPerPage);
}

