import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';

class SearchItem extends Component {
    state = {
        owner_login: '',
        repo_name: '',
        res_status: '',
        repo_info: {
            avatar_url: '',
            description: '',
            html_url: '',
            created_at: '',
            updated_at: '',
            stargazers_count: '',
            language: '',
            default_branch: '',
            subscribers_count: ''
        }
    }


    async componentDidMount() {
        const {match} = this.props
        const owner_login = match.params.owner_login
        const repo_name = match.params.repo_name
        
        await this.setState({
            owner_login, repo_name
        })

        if (this.state.owner_login && this.state.repo_name !== '') {
            await axios.get(`https://api.github.com/repos/${this.state.owner_login}/${this.state.repo_name}`)
                .then(res => {
                    console.log(res);
                    this.setState({
                        res_status: 200,
                        repo_info: {
                            avatar_url: res.data.owner.avatar_url,
                            description: res.data.description,
                            html_url: res.data.html_url,
                            created_at: res.data.created_at,
                            updated_at: res.data.updated_at,
                            stargazers_count: res.data.stargazers_count,
                            language: res.data.language,
                            default_branch: res.data.default_branch,
                            subscribers_count: res.data.subscribers_count
                        }
                    })
            })
                .catch(err => {
                    this.setState({
                        res_status: 'error'
                    })
            })
        }

    }
    render() {
       
        return (


            <div className="container mt-5">
                <a href="/" className="btn btn-outline-primary" role="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"/>
                    </svg>
                    to main page
                </a>
            {
                this.state.res_status === 'error'
                ? <Redirect push to="/" />
                : <div className="row gutters-sm mt-5">
                <div className="col-md-4 mb-3">
                   <div className="card">
                      <div className="card-body">
                         <div className="d-flex flex-column align-items-center text-center">
                           <img style={{maxWidth: '165px', maxHeight: '165px', borderRadius: '50%'}} src={this.state.repo_info.avatar_url} alt={this.state.repo_name} />
                         </div>
                         <hr />
                         <div className="row" style={{display: 'flex', justifyContent: 'space-around'}}>
                            <div className="col-auto">
                               <h6 className="mb-0">Stars</h6>
                            </div>
                            <div className="col-auto text-secondary"> {this.state.repo_info.stargazers_count}</div>
                            <div className="col-auto">
                               <h6 className="mb-0">Subscribers</h6>
                            </div>
                            <div className="col-auto text-secondary">  {this.state.repo_info.subscribers_count}</div>
             
                         </div>
                         <hr />
                         <ul className="list-group list-group-flush">
                         <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 className="mb-0">
                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github mr-2 icon-inline">
                                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                               </svg>
                               Github
                            </h6>
                            <a className="btn btn-secondary" target="__blank" href={this.state.repo_info.html_url}>Open</a>
                         </li>
                      </ul>
                      </div>
                   </div>
                </div>
                <div className="col-md-8">
                   <div className="card mb-3">
                      <div className="card-body">
                         <div className="row">
                            <div className="col-sm-3">
                               <h6 className="mb-0">Author</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">{this.state.owner_login}</div>
                         </div>
                         <hr />
                         <div className="row">
                            <div className="col-sm-3">
                               <h6 className="mb-0">Repository name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">{this.state.repo_name}</div>
                         </div>
                         <hr />
                         <div className="row">
                            <div className="col-sm-3">
                               <h6 className="mb-0">Default branch</h6>
                            </div>
                            <div className="col-sm-9 text-secondary"><span className="badge rounded-pill bg-success">{this.state.repo_info.default_branch}</span></div>
                         </div>
                         <hr />
                         <div className="row">
                            <div className="col-sm-3">
                               <h6 className="mb-0">Description</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">{this.state.repo_info.description}</div>
                         </div>
                         <hr />
                         <div className="row">
                             <div className="col-sm-2">
                               <h6 className="mb-0">Language</h6>
                             </div>
                            <div className="col-sm-2 text-secondary"><span className="badge rounded-pill bg-dark">{this.state.repo_info.language !== null ? this.state.repo_info.language : "unknown"}</span></div>
                         </div>
                         <hr />
                         <div className="row">
                            <div className="col-sm-2">
                               <h6 className="mb-0">Created</h6>
                            </div>
                            <div className="col-sm-4 text-secondary">{this.state.repo_info.created_at}</div>
                            <div className="col-sm-2">
                               <h6 className="mb-0">Updated</h6>
                            </div>
                            <div className="col-sm-4 text-secondary">{this.state.repo_info.updated_at}</div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
            }
            </div>
            
        )
    }
}

export default withRouter(SearchItem)