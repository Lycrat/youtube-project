export default function Button(props) {
  let text = props.text;
  let href = props.href;
  return (
    <a href={href} class="btn btn-light ms-auto" role="button">
      {text}
    </a>
  );
}
