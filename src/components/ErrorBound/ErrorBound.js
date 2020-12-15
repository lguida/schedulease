import React from 'react'

class ErrorBound extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render(){
        if (this.state.hasError) {
            return (
                <h2>Sorry! Something seems to have gone wrong...</h2>
            )
        }
        return this.props.children
    }
}

export default ErrorBound