import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Person
 *
 *
 */
export interface Person extends SanityDocument {
  _type: "person";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Job Title — `string`
   *
   *
   */
  jobTitle?: string;

  /**
   * Email — `string`
   *
   *
   */
  email?: string;

  /**
   * Public Phone Number — `string`
   *
   *
   */
  phone?: string;

  /**
   * Roles — `array`
   *
   *
   */
  roles?: Array<SanityKeyedReference<Role>>;

  /**
   * Bio — `array`
   *
   *
   */
  bio?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Headshot — `image`
   *
   *
   */
  headshot?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
}

/**
 * Role
 *
 *
 */
export interface Role extends SanityDocument {
  _type: "role";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };
}

/**
 * Blog Entry
 *
 *
 */
export interface BlogEntry extends SanityDocument {
  _type: "blog_entry";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Author — `reference`
   *
   *
   */
  author?: SanityReference<Person>;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Text — `array`
   *
   *
   */
  text?: Array<SanityKeyed<SanityBlock>>;
}

/**
 * Sermon
 *
 *
 */
export interface Sermon extends SanityDocument {
  _type: "sermon";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * PreachedAt — `datetime`
   *
   *
   */
  preachedAt?: string;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;

  /**
   * durationInSeconds — `number`
   *
   *
   */
  durationInSeconds?: number;

  /**
   * Passages — `array`
   *
   *
   */
  passages?: Array<SanityKeyed<string>>;

  /**
   * Event — `reference`
   *
   *
   */
  event?: SanityReference<SermonEvent>;

  /**
   * Series — `reference`
   *
   *
   */
  series?: SanityReference<SermonSeries>;

  /**
   * Speakers — `array`
   *
   *
   */
  speakers?: Array<SanityKeyedReference<Person>>;
}

/**
 * Sermon Series
 *
 *
 */
export interface SermonSeries extends SanityDocument {
  _type: "sermonSeries";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Subtitle — `string`
   *
   *
   */
  subtitle?: string;

  /**
   * Image Url — `string`
   *
   *
   */
  imageUrl?: string;
}

/**
 * Sermon Event
 *
 *
 */
export interface SermonEvent extends SanityDocument {
  _type: "sermonEvent";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;
}

export type Documents =
  | Person
  | Role
  | BlogEntry
  | Sermon
  | SermonSeries
  | SermonEvent;
