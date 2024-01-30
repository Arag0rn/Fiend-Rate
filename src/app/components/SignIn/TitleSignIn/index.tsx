const TitleSignIn = (
  { children, className }:
  { children: string, className: string }
) => {
  return (
    <h2 className={className}>{children}</h2>
  )
}

export default TitleSignIn;
