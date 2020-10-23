use identity_core::common::{Object, Timestamp};
use serde::{Deserialize, Serialize};

/// Options used to create a linked data signature
#[derive(Clone, Debug, Default, PartialEq, Deserialize, Serialize)]
pub struct SignatureOptions {
    #[serde(rename = "verificationMethod")]
    pub verification_method: String,
    #[serde(rename = "proofPurpose", skip_serializing_if = "Option::is_none")]
    pub proof_purpose: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub created: Option<Timestamp>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub domain: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub nonce: Option<String>,
    #[serde(flatten)]
    pub properties: Object,
}
