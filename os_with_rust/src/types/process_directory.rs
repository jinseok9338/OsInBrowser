use uuid::Uuid;
use yew::virtual_dom::VNode;

/// reducer's Action
pub struct ProcessAction {
    pub process: ProcessState,
    pub action_type: String,
}

#[derive(Clone, PartialEq, Debug)]
pub struct Dimension {
    pub height: f64,
    pub width: f64,
    pub top: f64,
    pub left: f64,
}

/// reducer's State
#[derive(Clone, PartialEq, Debug)]
pub struct ProcessState {
    pub process_name: Option<String>,
    pub process: Option<VNode>,
    pub id: Option<Uuid>,
    pub dimension: Option<Dimension>,
    pub is_full_size: Option<bool>,
    pub temp_dimension: Option<Dimension>,
}
