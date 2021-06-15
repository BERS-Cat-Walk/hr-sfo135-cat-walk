import React from 'react';
import style from './RelatedCSS/AddProduct.module.css';
import cardStyle from './RelatedCSS/Cards.module.css';

function AddOutfit (props) {
  return (
    <div className={cardStyle.card} data-testid='addOutfitCard'>
      <label className={style.addProduct}>&#43;<input type='radio' className={style.addProductButton} data-testid='addProduct' onClick={(event) => {props.addToOutfit(props.currentProduct)}}></input></label>
      <h4 className={style.addOutfit}>Add to Your Outfit</h4>
    </div>
  )
}

export default AddOutfit;