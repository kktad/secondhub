import {
    Field,
    RichText,
    withDatasourceCheck,
    Image,
    ImageField,
  } from '@sitecore-jss/sitecore-jss-nextjs';
  import { ComponentProps } from 'lib/component-props';
  import React from 'react';
  type HeroProps = ComponentProps & {
    fields: {
      heroimg: ImageField;
      herotext: Field<string>;
    };
  };
  const Hero = (props: HeroProps): JSX.Element => (
    <div className="hero">
      <div className="heroImg">
        <Image field={props.fields.heroimg} />
      </div>
      <React.Fragment>
        <RichText
          field={props.fields.herotext}
          tag="section"
          className="herotext"
          data-sample="other-attributes-pass-through"
        />
      </React.Fragment>
      <div className="heroCTA">
        <button>FIND YOUR WATCH</button>
        <button>FIND A BOUTIQUE</button>
        <button>FIND YOUR STRAP</button>
      </div>
    </div>
  );
  export default withDatasourceCheck()<HeroProps>(Hero);