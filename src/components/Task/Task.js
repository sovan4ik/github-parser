import { Component } from 'react';

export default class Task extends Component {
    render() {
        return (
            <div className="accordion accordion-flush bg-success mt-3" style={{boxShadow: '0px 0px 15px #cde1ff'}} id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Assigned task
                        </button>
                    </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                            <p>Implement a SPA that works with the github API.</p>
                            <p>Start screen - Splashscreen for a couple of seconds with your name.</p>
                            <p>Home page:</p>
                            <p>Search for repositories. Search form with validation (for emptiness).</p>
                            <p>Below is a list of the repositories found.</p>
                            <p>Each element of the list contains a picture, a title, a rating, a view more button, an add to favorites button.</p>
                            <p>If not found, display the corresponding label.</p>
                            <p>Implement pagination at the bottom of the page.</p>
                            <p>Implement a page for the view more button with detailed information on the repository (author's avatar, login, repository name, creation date, description, link to github, etc.).</p>
                            <p>Implement the ability to add / remove a repository to favorites (as an option, just make a mark on it that it is in the favorites)</p>
                            <p><code>React</code>, <code>Redux</code>, <code>LocalStorage</code> technologies</p>
                            <p>Additional task:</p>
                            <p>Implement sorting of found repositories by date, rating, name.</p>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}