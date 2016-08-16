import React from 'react';
import { Grid, Row, Col, Image, Thumbnail, Button } from 'react-bootstrap';

const RecipeBox = (props) => {
  return(
      <Col xs={6} md={4}>
        <Thumbnail src={props.recipe.get('imagePath')} alt="242x200">
          <h3>{props.recipe.get('name')}</h3>
          <p>{props.recipe.get('description')}</p>
          <p>
            <Button bsStyle="primary">刪除</Button>&nbsp;
            <Button bsStyle="default">修改</Button>
          </p>
        </Thumbnail>
      </Col>

    );
}

export default RecipeBox;