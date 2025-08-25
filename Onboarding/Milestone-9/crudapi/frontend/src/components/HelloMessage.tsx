export function HelloMessage() {
  return <h1>Hey Jackson this thing is working </h1>;
}

export function Testbutton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}>
      Hello
    </button>
  );
}
