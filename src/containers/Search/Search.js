import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import SearchResults from '../../containers/SearchResults/SearchResults';
import SplashScreen from '../../containers/SplashScreen/SplashScreen';

export default class Search extends Component {
    state = {
        splashScreen: true,
        currentPage: 1,
        perPage: 10,
        totalCount: 0,
        isFormValid: false,
        isButtonPressed: false,
        formControls: {
            search: {
                value: '',
                type: 'text',
                label: 'Search',
                errorMessage: 'Enter correct request, min 2 symbols',
                valid: false,
                touched: false,
                validation: {
                    requred: true,
                    minLength: 2
                }
            }
        }
    }
   
    validateControl(value, validation) {
        if(!validation) {
            return true
        }

        let isValid = true

        if (validation.requred) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid
    }
    onChangeHandler = (event, controlName) => {
        //console.log(`${controlName}:`, event.target.value);
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true
        let isButtonPressed = false

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })
        this.setState({
            formControls, isFormValid, isButtonPressed
        })
    }

    submitHandler = event => {
        event.preventDefault();
        this.setState({
            isButtonPressed: true
        })  
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                splashScreen: false
            })
        }, 3000);
    }

    renderInput() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return(
                <Input
                key={controlName + index}
                type={control.type}
                value={control.value}
                className={'form-control'}
                valid={control.valid}
                touched={control.touched}
                label={control.label}
                shouldValidate={!!control.validation}
                errorMessage={control.errorMessage}
                onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }
    render () {
        const submitBtn = !this.state.isFormValid || this.state.isButtonPressed ? "btn-primary" : "btn-success";
        return (
            <div className="mt-5 mb-5">
                {
                    this.state.splashScreen
                    ? <SplashScreen/>
                    : null
                }

                <form onSubmit={this.submitHandler} className="row d-flex align-items-end mb-4" style={{position: 'relative'}}>
                    <div className="col">
                        { this.renderInput() }
                    </div>
                    <div className="col-auto">
                        <button 
                        type="submit" 
                        className={`btn ${submitBtn}`}
                        disabled={!this.state.isFormValid || this.state.isButtonPressed}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                        </button>
                    </div>
                </form>
                    <SearchResults 
                    searchKeyword={this.state.formControls.search.value}
                    isButtonPressed={this.state.isButtonPressed}
                     />
            </div>
        )
    }
}
