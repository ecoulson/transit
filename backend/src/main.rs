use backend::proto::renderables::Renderable;

fn main() {
    let mut renderable = Renderable::default();
    renderable.test = String::from("test");
    println!("renderable name {}", renderable.test);
}
