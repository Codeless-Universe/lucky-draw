import SVGMapper from "./SVGMapper";

type KEYS = keyof typeof SVGMapper;

export default function SVGWrap(props: { name?: KEYS; svg?: string; className?: string; loading?: boolean }) {
  let svg: string = ""
  if (props.name) {
    //@ts-ignore
    svg = SVGMapper[props.name]
  } else if (props.svg) {
    svg = props.svg
  }
  if (props.loading) {
    svg = SVGMapper.loading
  }

  let classArray = ["xicon"]
  if (props.className) {
    classArray.push(props.className)
  }
  return <span className={classArray.join(" ")} dangerouslySetInnerHTML={{ __html: svg }}></span>
}
