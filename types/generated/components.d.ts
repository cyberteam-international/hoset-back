import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsAboutSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_sections';
  info: {
    displayName: 'AboutSection';
  };
  attributes: {
    Button: Schema.Attribute.Component<'shared.button', false>;
    Description: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Schema.Attribute.String;
  };
}

export interface SectionsCustomersSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_customers_sections';
  info: {
    displayName: 'CustomersSection';
  };
  attributes: {
    CustomersBlocks: Schema.Attribute.Component<'shared.customers-block', true>;
    Description: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Schema.Attribute.String;
  };
}

export interface SectionsHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_sections';
  info: {
    displayName: 'HeroSection';
  };
  attributes: {
    Button: Schema.Attribute.Component<'shared.button', true>;
    Image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsIncludedSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_included_sections';
  info: {
    displayName: 'IncludedSection';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    IncludedBoxes: Schema.Attribute.Component<'shared.included-box', true>;
    Title: Schema.Attribute.String;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    Text: Schema.Attribute.String & Schema.Attribute.Required;
    Variant: Schema.Attribute.Enumeration<['primary', 'secondary']> &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedCustomersBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_customers_blocks';
  info: {
    displayName: 'CustomersBlock';
  };
  attributes: {
    CustomersBlockIconCenter: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    CustomersBlockIconUp: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    Description: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface SharedIncludedBox extends Struct.ComponentSchema {
  collectionName: 'components_shared_included_boxes';
  info: {
    displayName: 'IncludedBox';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Number: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedMediumButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_medium_buttons';
  info: {
    displayName: 'MediumButton';
  };
  attributes: {
    href: Schema.Attribute.String;
    Text: Schema.Attribute.String;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.about-section': SectionsAboutSection;
      'sections.customers-section': SectionsCustomersSection;
      'sections.hero-section': SectionsHeroSection;
      'sections.included-section': SectionsIncludedSection;
      'shared.button': SharedButton;
      'shared.customers-block': SharedCustomersBlock;
      'shared.included-box': SharedIncludedBox;
      'shared.media': SharedMedia;
      'shared.medium-button': SharedMediumButton;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
