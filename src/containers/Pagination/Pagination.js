import React, { Component} from 'react';

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};

export default class Pagination extends Component {

    constructor(props) {
        super(props);

        const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;
        this.pageLimit = typeof pageLimit === "number" ? pageLimit : 100;
        this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;
        this.pageNeighbours = typeof pageNeighbours === "number" ? Math.max(0, Math.min(pageNeighbours, 2)) : 0;
        this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
        this.state = { currentPage: 1 };
    }

    componentDidMount() {
        this.gotoPage(1);
    }

    gotoPage = page => {
        const { onPageChanged = f => f } = this.props;

        const currentPage = Math.max(0, Math.min(page, this.totalPages));

        const paginationData = {
            currentPage,
            totalPages: this.totalPages,
            pageLimit: this.pageLimit,
            totalRecords: this.totalRecords
        };

        this.setState({ currentPage }, () => onPageChanged(paginationData));
    };

    handleClick = (page, event) => {
        event.preventDefault();
        this.gotoPage(page);
    };

    handleMoveLeft = event => {
        event.preventDefault();
        this.gotoPage(this.state.currentPage - 1);
    };

    handleMoveRight = event => {
        event.preventDefault();
        this.gotoPage(this.state.currentPage + 1);
    };

    getPages = () => {
        const totalPages = this.totalPages;
        const currentPage = this.state.currentPage;
        const pageNeighbours = this.pageNeighbours;

        const countNumbers = this.pageNeighbours * 2 + 3;
        const totalButtons = countNumbers + 2;

        if (totalPages > totalButtons) {
            let pages = [];

            const countLeftButtons = currentPage - pageNeighbours;
            const countRightButtons = currentPage + pageNeighbours;
            const beforeLastPage = totalPages - 1;

            const startPage = countLeftButtons > 2 ? countLeftButtons : 2;
            const endPage = countRightButtons < beforeLastPage ? countRightButtons : beforeLastPage;

            pages = range(startPage, endPage);

            const pagesCount = pages.length;
            const singleSpillOffset = countNumbers - pagesCount - 1;

            const leftSpill = startPage > 2;
            const rightSpill = endPage < beforeLastPage;

            const leftSpillPage = LEFT_PAGE;
            const rightSpillPage = RIGHT_PAGE;

            if (leftSpill && !rightSpill) {
                const extraPages = range(startPage - singleSpillOffset, startPage - 1);
                pages = [leftSpillPage, ...extraPages, ...pages];
            } else if (!leftSpill && rightSpill) {
                const extraPages = range(endPage + 1, endPage + singleSpillOffset);
                pages = [...pages, ...extraPages, rightSpillPage];
            } else if (leftSpill && rightSpill) {
                pages = [leftSpillPage, ...pages, rightSpillPage];
            }

            return [1, ...pages, totalPages];
        }

        return range(1, totalPages);
    };

    render() {
        if (!this.totalRecords) return null;

        if (this.totalPages === 1) return null;

        const { currentPage } = this.state;
        const pages = this.getPages();

        return(
            <div className="mt-5 mb-4 d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {pages.map((page, index) => {
                            if (page === LEFT_PAGE)
                                return (
                                  <li key={index} className="page-item">
                                      <a className="page-link" href="/" onClick={this.handleMoveLeft}
                                      >
                                          <span aria-hidden="true">&laquo;</span>
                                      </a>
                                  </li>
                                );

                            if (page === RIGHT_PAGE)
                                return (
                                  <li key={index} className="page-item">
                                      <a className="page-link" href="/" onClick={this.handleMoveRight}>
                                          <span aria-hidden="true">&raquo;</span>
                                      </a>
                                  </li>
                                );

                            return (
                              <li key={index} className={`page-item${currentPage === page ? " active" : ""}`}>
                                  <a className="page-link" href="/" onClick={e => this.handleClick(page, e)}>{page}</a>
                              </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        )
    }
}
