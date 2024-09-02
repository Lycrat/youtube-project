export default function Button(props) {
  let text = props.text;
  let href = props.href;
  let onClick = props.onClick || null;
  return (
    <a
      href={href}
      class="btn btn-light ms-auto"
      role="button"
      onClick={onClick}
    >
      {text}
    </a>
  );
}
