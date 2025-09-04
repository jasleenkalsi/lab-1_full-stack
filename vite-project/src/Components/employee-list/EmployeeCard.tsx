type Props = { name: string };

export default function EmployeeCard({ name }: Props) {
  return <article className="p-3 border rounded">{name}</article>;
}
