import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsAboutSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_sections';
  info: {
    displayName: 'AboutSection';
  };
  attributes: {
    Button: Schema.Attribute.Component<'shared.button', false>;
    Description: Schema.Attribute.Text;
    lightVersion: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    Media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Schema.Attribute.RichText;
  };
}

export interface SectionsAdvantagesSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_advantages_sections';
  info: {
    displayName: 'AdvantagesSection';
  };
  attributes: {
    AdvantagesBoxes: Schema.Attribute.Component<'shared.advantages-box', true>;
    Title: Schema.Attribute.String;
  };
}

export interface SectionsAdvantagesSectionV2 extends Struct.ComponentSchema {
  collectionName: 'components_sections_advantages_section_v2s';
  info: {
    displayName: 'AdvantagesSectionV2';
  };
  attributes: {
    AdvantagesBoxes: Schema.Attribute.Component<
      'shared.advantages-box-v2',
      true
    >;
    Description: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface SectionsBigGallarySection extends Struct.ComponentSchema {
  collectionName: 'components_sections_big_gallary_sections';
  info: {
    displayName: 'BigGallarySection';
  };
  attributes: {
    Gallary: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    lightVersion: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    Title: Schema.Attribute.String;
  };
}

export interface SectionsBigMediaSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_big_media_sections';
  info: {
    displayName: 'BigMediaSection';
  };
  attributes: {
    Media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SectionsCallToAction extends Struct.ComponentSchema {
  collectionName: 'components_sections_call_to_actions';
  info: {
    displayName: 'CallToAction';
  };
  attributes: {
    Button: Schema.Attribute.Component<'shared.button', false>;
    CallToActionItems: Schema.Attribute.Component<
      'shared.call-to-action-items',
      true
    >;
    Description: Schema.Attribute.Text;
    MobileVideo: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    TopLeftText: Schema.Attribute.String;
    Video: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SectionsCallToActionV2 extends Struct.ComponentSchema {
  collectionName: 'components_sections_call_to_action_v2s';
  info: {
    displayName: 'CallToActionV2';
  };
  attributes: {
    Button: Schema.Attribute.Component<'shared.button', false>;
    CallToActionItems: Schema.Attribute.Component<
      'shared.call-to-action-items',
      true
    >;
    Description: Schema.Attribute.Text;
    MobileVideo: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    Title: Schema.Attribute.String;
    TopLeftText: Schema.Attribute.String;
    Video: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SectionsContentSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_content_sections';
  info: {
    displayName: 'ContentSection';
  };
  attributes: {
    Rows: Schema.Attribute.Component<'shared.content-raw', true>;
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
    lightVersion: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    Title: Schema.Attribute.String;
  };
}

export interface SectionsGallarySection extends Struct.ComponentSchema {
  collectionName: 'components_sections_gallary_sections';
  info: {
    displayName: 'GallarySection';
  };
  attributes: {
    GallaryItems: Schema.Attribute.Component<
      'shared.gallary-item-with-link',
      true
    >;
    Title: Schema.Attribute.String;
  };
}

export interface SectionsGallaryWithButtons extends Struct.ComponentSchema {
  collectionName: 'components_sections_gallary_with_buttons';
  info: {
    displayName: 'GallaryWithButtons';
  };
  attributes: {
    GallaryItems: Schema.Attribute.Component<'shared.slide-with-buttons', true>;
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
    Description: Schema.Attribute.Text;
    Media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
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
    lightVersion: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    Title: Schema.Attribute.String;
  };
}

export interface SectionsProjectsListSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_projects_list_sections';
  info: {
    displayName: 'ProjectsListSection';
  };
  attributes: {
    Projects: Schema.Attribute.Relation<'oneToMany', 'api::project.project'>;
    Title: Schema.Attribute.String;
  };
}

export interface SectionsTextSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_sections';
  info: {
    displayName: 'TextSection';
  };
  attributes: {
    Content: Schema.Attribute.RichText;
    Title: Schema.Attribute.String;
  };
}

export interface SectionsVideoSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_video_sections';
  info: {
    displayName: 'VideoSection';
  };
  attributes: {
    Button: Schema.Attribute.Component<'shared.button', true>;
    Description: Schema.Attribute.Text;
    lightVersion: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    MobileVideo: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    Title: Schema.Attribute.String;
    TopLeftText: Schema.Attribute.String;
    Video: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedAdvantagesBox extends Struct.ComponentSchema {
  collectionName: 'components_shared_advantages_boxes';
  info: {
    displayName: 'AdvantagesBox';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Number: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface SharedAdvantagesBoxV2 extends Struct.ComponentSchema {
  collectionName: 'components_shared_advantages_box_v2s';
  info: {
    displayName: 'AdvantagesBoxV2';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
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
    Variant: Schema.Attribute.Enumeration<['primary', 'secondary', 'white']> &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedCallToActionItems extends Struct.ComponentSchema {
  collectionName: 'components_shared_call_to_action_items';
  info: {
    displayName: 'CallToActionItems';
  };
  attributes: {
    href: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface SharedContentRaw extends Struct.ComponentSchema {
  collectionName: 'components_shared_content_raws';
  info: {
    displayName: 'ContentRaw';
  };
  attributes: {
    addSecondPicture: Schema.Attribute.Boolean;
    Description: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Image2: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Schema.Attribute.String;
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

export interface SharedGallaryItemWithLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_gallary_item_with_links';
  info: {
    displayName: 'GallaryItemWithLink';
  };
  attributes: {
    href: Schema.Attribute.String;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    LinkText: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface SharedIncludedBox extends Struct.ComponentSchema {
  collectionName: 'components_shared_included_boxes';
  info: {
    displayName: 'IncludedBox';
  };
  attributes: {
    Button: Schema.Attribute.Component<'shared.medium-button', false>;
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

export interface SharedSlideWithButtons extends Struct.ComponentSchema {
  collectionName: 'components_shared_slide_with_buttons';
  info: {
    displayName: 'SlideWithButtons';
  };
  attributes: {
    Button: Schema.Attribute.Component<'shared.button', true>;
    Media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Schema.Attribute.String;
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
      'sections.advantages-section': SectionsAdvantagesSection;
      'sections.advantages-section-v2': SectionsAdvantagesSectionV2;
      'sections.big-gallary-section': SectionsBigGallarySection;
      'sections.big-media-section': SectionsBigMediaSection;
      'sections.call-to-action': SectionsCallToAction;
      'sections.call-to-action-v2': SectionsCallToActionV2;
      'sections.content-section': SectionsContentSection;
      'sections.customers-section': SectionsCustomersSection;
      'sections.gallary-section': SectionsGallarySection;
      'sections.gallary-with-buttons': SectionsGallaryWithButtons;
      'sections.hero-section': SectionsHeroSection;
      'sections.included-section': SectionsIncludedSection;
      'sections.projects-list-section': SectionsProjectsListSection;
      'sections.text-section': SectionsTextSection;
      'sections.video-section': SectionsVideoSection;
      'shared.advantages-box': SharedAdvantagesBox;
      'shared.advantages-box-v2': SharedAdvantagesBoxV2;
      'shared.button': SharedButton;
      'shared.call-to-action-items': SharedCallToActionItems;
      'shared.content-raw': SharedContentRaw;
      'shared.customers-block': SharedCustomersBlock;
      'shared.gallary-item-with-link': SharedGallaryItemWithLink;
      'shared.included-box': SharedIncludedBox;
      'shared.media': SharedMedia;
      'shared.medium-button': SharedMediumButton;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slide-with-buttons': SharedSlideWithButtons;
      'shared.slider': SharedSlider;
    }
  }
}
