export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export function Checkbox(props: CheckboxProps) {
  return (
    <label className="checkbox">
      <input
        value={props.checked + ""}
        onInput={() => props.onChange(!props.checked)}
        type="checkbox"
      />

      <span>{props.label}</span>
    </label>
  );
}
