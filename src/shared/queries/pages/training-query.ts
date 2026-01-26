import { CONTENT_BLOCK_FIELDS_FRAGMENT } from '@/shared/queries/fragments';

const FEATURE_ITEM_FRAGMENT = `
  fields {
    key
    value
    reference {
      ... on MediaImage {
        image {
          url
        }
      }
    }
  }
`;

const FAQ_ITEM_FRAGMENT = `
  fields {
    key
    value
  }
`;

export const GET_TRAINING_PAGE = `
  query GetTrainingPage($handle: String!) {
    page(handle: $handle) {
      id
      title
      handle
      seo {
        title
        description
      }
      training: metafield(namespace: "custom", key: "training") {
        reference {
          ... on Metaobject {
            description: field(key: "description") {
              references(first: 20) {
                edges {
                  node {
                    ... on Metaobject {
                      ${CONTENT_BLOCK_FIELDS_FRAGMENT}
                    }
                  }
                }
              }
            }
            howItWorksTitle: field(key: "how_it_works_title") {
              value
            }
            howItWorks: field(key: "how_it_works") {
              references(first: 10) {
                edges {
                  node {
                    ... on Metaobject {
                      ${FEATURE_ITEM_FRAGMENT}
                    }
                  }
                }
              }
            }
            modulesTitle: field(key: "modules_title") {
              value
            }
            modules: field(key: "modules") {
              references(first: 10) {
                edges {
                  node {
                    ... on Metaobject {
                      ${FEATURE_ITEM_FRAGMENT}
                    }
                  }
                }
              }
            }
            logos: field(key: "logos") {
              references(first: 20) {
                edges {
                  node {
                    ... on Metaobject {
                      ${CONTENT_BLOCK_FIELDS_FRAGMENT}
                    }
                  }
                }
              }
            }
            videoTitle: field(key: "video_title") {
              value
            }
            video: field(key: "video") {
              reference {
                ... on Video {
                  sources {
                    url
                    mimeType
                  }
                }
              }
            }
            videoPoster: field(key: "video_poster") {
              reference {
                ... on MediaImage {
                  image {
                    url
                  }
                }
              }
            }
            faqTitle: field(key: "faq_title") {
              value
            }
            faq: field(key: "faq") {
              references(first: 20) {
                edges {
                  node {
                    ... on Metaobject {
                      ${FAQ_ITEM_FRAGMENT}
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
