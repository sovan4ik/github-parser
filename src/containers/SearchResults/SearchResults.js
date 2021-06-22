import { Component } from 'react';
import axios from 'axios';
import Pagination from '../../containers/Pagination/Pagination';
import Select from '../../components/UI/Select/Select';

export default class SearchResults extends Component {

    state = {
        isLoading: false,
        searchKeyword: '',
        sortCurrent: 'stars',
        currentPage: null,
        totalPages: null,
        pageLimit: null,
        prevPage: null,
        repos: [],
        favList: [],
        dataByKeyword: false,
        dataBySelect: false,

    }
    typeOfSortFunction = param => {
        this.setState({
            sortCurrent: param,
            dataBySelect: true
        })
    }
    onPageChanged = data => {
        const { currentPage, totalPages, pageLimit } = data;
        // const offset = (currentPage - 1) * pageLimit;
        this.setState({ currentPage, totalPages, pageLimit});
    };

    changeFavoriteHandler = (value) => {
        const favList = this.state.favList;
        let index = favList.indexOf(value);
        !favList.includes(value)
        ? favList.push(value)
        : favList.splice(index, 1)
        this.setState({
            favList
        })
        localStorage.setItem('favList', this.state.favList.join(','))
      };
    async componentDidUpdate() {
        if (localStorage.getItem('favList') !== null && localStorage.getItem('favList').length !== 0) {
            this.state.favList = localStorage.getItem('favList').split(',').map(Number);
        }
        if ((this.props.searchKeyword !== '' && this.props.isButtonPressed && !this.state.dataByKeyword) || this.state.dataBySelect || this.state.currentPage !== this.state.prevPage) {
            if (!this.state.isLoading) {
              this.setState({
                isLoading: true
              })  
            }
            await axios.get('https://api.github.com/search/repositories', {
                params: {
                    q: this.props.searchKeyword,
                    sort: this.state.sortCurrent,
                    per_page: this.state.pageLimit,
                    page: this.state.currentPage,
                }
              })
              .then(res => {
                const repos = [];
                for (let i = 0; i < res.data.items.length; i++) {
                    let data = res.data.items.[i];
                    repos.push({
                        id: data.id,
                        name: data.name,
                        full_name: data.full_name,
                        avatar_url: data.owner.avatar_url,
                        stars: data.stargazers_count
                    })
                }
                this.setState ({
                    repos,
                    totalRepo: res.data.total_count,
                    dataByKeyword: true,
                    dataBySelect: false,
                    searchKeyword: this.props.searchKeyword,
                    prevPage: this.state.currentPage,
                    isLoading: false
                })
              })
              .catch(err => {
                console.log(err);
              })
        } else {
            if(this.state.dataByKeyword && this.props.searchKeyword !== this.state.searchKeyword) {
                this.setState({
                    dataByKeyword: false,
                    isLoading: false
                })
            }
        }

    }

    render () {
        let loader = 
        <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-white" style={{zIndex: '999'}}>
            <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      </div>;

        let table;
            if (this.state.searchKeyword.length > 1 && this.state.repos.length !== 0) {
                table = 
                <div>
                <div className="alert alert-success d-flex align-items-center" role="alert">
                    <div className="d-flex align-items-center">
                        Count of repos: <span className="badge rounded-pill badge bg-light text-dark align-middle ms-1">{this.state.totalRepo}</span> <span className="ms-2 me-2"> > </span>  
                        Displayed on page: <span className="badge rounded-pill badge bg-light text-dark align-middle ms-1">{this.state.repos.length}</span> <span className="ms-2 me-2"> > </span>  
                        Sort type: by <span className="badge rounded-pill badge bg-light text-dark align-middle ms-1">{this.state.sortCurrent}</span>
                    </div>
                </div>
                <div className="row justify-content-end mt-4 mb-4">
                    <div className="col-4">
                        <Select
                        typeOfSortFunction={this.typeOfSortFunction.bind(this)}
                        sortCurrent={this.state.sortCurrent}
                        />
                    </div>
                </div>
                <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Repository name</th>
                        <th scope="col">Full info page</th>
                        <th scope="col">Stars</th>
                        <th scope="col">Favorite</th>
                    </tr>
                </thead>
                <tbody>
                { this.state.repos.map(repo => 
                    <tr key={repo.id} style={{verticalAlign: 'middle'}}>
                        <th scope="row"><img style={{maxWidth: '40px', maxHeight: '40px', borderRadius: '50%'}} src={repo.avatar_url} alt={repo.name} /></th>
                        <td><span className="badge bg-light text-dark fs-6">{repo.name}</span></td>
                        <td><a href={'/repository/'+ repo.full_name} className="btn btn-secondary fs-7" tabIndex="-1" role="button" aria-disabled="true">view more</a></td>
                        <td>{repo.stars}</td>
                        <td>
                        <button 
                        type="button" 
                        className={`btn ${this.state.favList.includes(repo.id) ? "btn-warning" : "btn-light"}`}
                        onClick={this.changeFavoriteHandler.bind(this, repo.id)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-star" viewBox="0 0 16 16">
                                <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z"></path>
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path>
                            </svg>
                            <span className="visually-hidden">Button</span>
                        </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <Pagination
            totalRecords={this.state.totalRepo}
            pageLimit={10}
            pageNeighbours={2}
            onPageChanged={this.onPageChanged}
            />
            </div>
            } else if (this.state.searchKeyword.length > 1 && this.state.repos.length === 0) {
                table = 
                <div className="alert alert-warning d-flex align-items-center" role="alert">
                    <div>
                        Count of repos: {this.state.repos.length}. Request gived empty result :/
                    </div>
                </div>
            } else {
                table = 
                <div className="alert alert-primary d-flex align-items-center" role="alert">
                <div>
                  Please enter your request
                </div>
              </div>
            }

        return (
            <div className="searchResults position-relative" style={{marginTop: '36px'}}>
                { this.state.isLoading ? loader : null}
                {table}
            </div>
        )
    }
}