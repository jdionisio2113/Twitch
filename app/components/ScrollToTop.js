import React from 'react';

class ScrollToTop extends React.Component {
    constructor() {
        super()

        this.handleScroll = this.handleScroll.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll.bind(this));
        document.querySelector(".scroll-up").style.display = "none";
        window.scrollTo(0, 0);
    }


    // Get scroll position
    // if scroll position is above 300px, display the "scroll to top" button, otherwise don't display the button
    handleScroll() {
        const scrolled = window.scrollY;

        if (scrolled > 300) {
            document.querySelector(".scroll-up").style.display = "block";
        } else {
            document.querySelector(".scroll-up").style.display = "none";
        }
    }

    handleClick() {
        if (window.pageYOffset > 300) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }

    render() {
        return (
            <div>
                <button className="scroll-up" onClick={this.handleClick}>
                    <i className="fa fa-chevron-up fa-3x" />
                </button>
            </div>
        )
    }
}

export default ScrollToTop