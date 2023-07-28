pub mod proto {
    pub mod renderables {
        include!(concat!(env!("OUT_DIR"), "/renderables.rs"));
    }
}

pub use proto::renderables;
