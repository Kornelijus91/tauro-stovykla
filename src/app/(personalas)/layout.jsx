import PersonalasLayout from "@/components/PersonalasLayout"

export const metadata = {
    title: 'Tauro Stovykla',
	robots: {
		index: false,
	},
}

export default function RootLayout({ children }) {
	return (
		<PersonalasLayout>
			{ children }
		</PersonalasLayout>
  	)
}
