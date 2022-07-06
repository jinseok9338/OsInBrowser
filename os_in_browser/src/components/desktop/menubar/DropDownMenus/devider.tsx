interface Dividerprops {
  size: "sm" | "lg";
}

const Divider = ({ size = "sm", ...props }: Dividerprops) => (
  <li role="separator" class={`divider ${size}`} {...props} />
);

export default Divider;
