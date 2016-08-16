import React from 'react';
import { Form, FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';

const ShareBox = ({
  onChangeNameInput,
  onChangeDescriptionInput,
  onChangeImageUrl,
  onRecipeSubmit,
}) => (
  <div>
    <Form horizontal>
      <FormGroup
        controlId="formBasicText"
      >
        <ControlLabel>請輸入食譜名稱</ControlLabel>
        <FormControl
          type="text"
          placeholder="Enter text"
          onChange={onChangeNameInput}
        />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup
        controlId="formBasicText"
      >
        <ControlLabel>請輸入食譜說明</ControlLabel>
        <FormControl 
          componentClass="textarea" 
          placeholder="textarea" 
          onChange={onChangeDescriptionInput}
        />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup
        controlId="formBasicText"
      >
        <ControlLabel>請輸入食譜圖片網址</ControlLabel>
        <FormControl
          type="text"
          placeholder="Enter text"
          onChange={onChangeImageUrl}
        />
        <FormControl.Feedback />
      </FormGroup>
      <Button 
        onClick={onRecipeSubmit} 
        bsStyle="success" 
        bsSize="large" 
        block
      >
        提交送出
      </Button>
    </Form>
  </div>
);

export default ShareBox;