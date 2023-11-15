import HomepageHero from '../assets/hero.jpg'

export default function Home (props) {
	const { msgAlert, user } = props

	return (
		<div className="m-4 p-4 text-center" style={{backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px'}}>
			<div>
				<h2>Paw Circle</h2>
				<h4>Check out pets and meetups around you!</h4>
			</div>
			<div style={{backgroundImage: `url(${HomepageHero})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '500px'}}></div>
		</div>
		

	)
}