import {
  RichText,
  withDatasourceCheck,
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
const Hero = ({ fields }: HeroProps): JSX.Element => {
  return (
    <div className="hero">
      <div className="heroImg">
        <Image field={fields.HeroImage} />
      </div>
      <RichText
        field={fields.HeroText}
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
export default withDatasourceCheck()<HeroProps>(Hero);
