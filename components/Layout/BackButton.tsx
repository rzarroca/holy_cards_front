import Button from "components/Button";
import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter()

  return <Button onClick={() => router.back()}>{`<`}</Button>
}