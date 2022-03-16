import Link from "next/link";

export default function Home() {
	return (
		<div>
			<Link
				prefetch={false}
				href={{
					pathname: "/[username]",
					query: { username: "hongjia" },
				}}
			>
				<a>Hongjia&apos;s profile</a>
			</Link>
		</div>
	);
}
