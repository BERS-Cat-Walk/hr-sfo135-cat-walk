import React from 'react';
import ReactDOM from 'react-dom';
import Review from './review.jsx';
import NewReviewForm from './newReviewForm.jsx';
import style from './relatedCSS/reviewList.module.css';

class ReviewList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // product_id: undefined,
      rating: '',
      summary: '',
      body: '',
      recommend: '',
      name: '',
      email: '',
      photos: [],
      characteristics: {
      }
    };
    this.closePortal = this.closePortal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStarRating = this.handleStarRating.bind(this);
    this.handleCharacteristicRating = this.handleCharacteristicRating.bind(this);
  }

  componentDidMount() {
    let characteristicsObj = {};
    const characteristics = this.props.list.meta.characteristics;
    Object.keys(characteristics).forEach((key) => {
      const id = characteristics[key].id;
      characteristicsObj[id] = 0;
    })
    this.setState({characteristics: characteristicsObj});
  }

  closePortal() {
    this.setState({openPortal: false});
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleStarRating(value) {
    this.setState({rating: value})
    const valueMeaning = ['Poor', 'Fair', 'Average', 'Good', 'Great'];
    return ReactDOM.createPortal(<div>{valueMeaning[value - 1]}</div>, document.getElementById('reactiveStarText'));
  }

  handleCharacteristicRating(characteristic, rating, characteristics = {}) {
    Object.assign(characteristics, this.state.characteristics);
    characteristics[characteristic] = rating;
    this.setState({characteristics});
  }

  render() {
    if (this.props.list.productReviews) {
      const max = this.props.list.reviewsToRender;
      const reviews = this.props.list.productReviews.slice(0, max);
      const renderButton = this.props.list.productReviews.length > 2 && this.props.list.productReviews.length !== reviews.length;
      return (
        <div>
            {this.props.list.productReviews.length === reviews.length ? <button className={style.reviewListButton} onClick={this.props.showLessReviewsButtonPressed}>less reviews</button> : null}
            {this.props.list.productReviews.length === reviews.length ? <button className={style.reviewListButton} onClick={this.props.toggleNewReviewForm}>add review</button> : null}
          <div className={style.reviewList}>
            {reviews.map((review) => {
              return <Review key={review.review_id} review_id={review.review_id} currentReview={review}/>
            })}
            {renderButton ? <button className={style.reviewListButton} onClick={this.props.showMoreReviewsButtonPressed}>more reviews</button> : null}
            {this.props.list.productReviews.length !== reviews.length ? <button className={style.reviewListButton} onClick={this.props.toggleNewReviewForm}>add review</button> : null}
          </div>
          {this.props.openPortal
            ? <NewReviewForm
                state={this.state}
                characteristics={this.props.list.meta.characteristics}
                handleStarRating={this.handleStarRating}
                handleInputChange={this.handleInputChange}
                handleCharacteristicRating={this.handleCharacteristicRating}
                toggleNewReviewForm={this.props.toggleNewReviewForm}
                submitReview={this.props.submitReview}
              />
            : null
          }
          {/* <button onClick={() => {this.props.toggleNewReviewForm(); this.props.submitReview(this.state);}}>Submit review</button> */}
        </div>
       )
    } else {
      return (
        <div>loading..</div>
      )
    }
  }
}

export default ReviewList;