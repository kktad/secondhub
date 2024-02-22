import {
  RichText,
  Image,
  ImageField,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React from 'react';
type HeroProps = ComponentProps & {
  fields: {
    HeroImage: ImageField;
    HeroText: RichTextField;
  };
};

export const Default = (props: HeroProps): JSX.Element => {
  return (
    <div className="hero">
      <div className="heroImg">
        <Image field={props.fields.HeroImage} />
      </div>
      <RichText
        field={props.fields.HeroText}
        tag="section"
        className="herotext"
        data-sample="other-attributes-pass-through"
      />
      <div className="heroCTA">
        <button>FIND YOUR WATCH</button>
        <button>FIND A BOUTIQUE</button>
        <button>FIND YOUR STRAP</button>
      </div>
    </div>
  );
};

export const CTAOnTop = (props: HeroProps): JSX.Element => {
  return (
    <div className="hero">
      <div className="heroCTA">
        <button>FIND YOUR WATCH</button>
        <button>FIND A BOUTIQUE</button>
        <button>FIND YOUR STRAP</button>
      </div>
      <div className="heroImg">
        <Image field={props.fields.HeroImage} />
      </div>
      <RichText
        field={props.fields.HeroText}
        tag="section"
        className="herotext"
        data-sample="other-attributes-pass-through"
      />      
    </div>
  );
};