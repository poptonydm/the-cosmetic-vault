export default function About() {
    const team = [
      { name: 'Selorm A.', role: 'Lead Stylist', specialty: 'Natural Hair & Color', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' },
      { name: 'Efua M.', role: 'Nail Tech', specialty: 'Acrylics & Nail Art', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
      { name: 'Kwame T.', role: 'Barber', specialty: 'Fades & Beard Grooming', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' }
    ];
  
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl font-bold mb-6">About Glow Studio</h1>
          <p className="text-lg text-neutral-700 mb-4">
            Founded in Accra, Glow Studio was built to make premium beauty accessible and booking stress-free. 
            We combine skilled artistry with tech so you spend less time waiting and more time glowing.
          </p>
          <p className="text-lg text-neutral-700">
            From silk presses to pedicures, our team is trained on the latest techniques and uses only professional-grade products. 
            Walk in, book online, or shop from home.
          </p>
        </div>
  
        <h2 className="text-3xl font-bold mb-8">Meet The Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map(member => (
            <div key={member.name} className="text-center">
              <img src={member.img} alt={member.name} className="w-full aspect-square object-cover rounded-2xl mb-4" />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-rose-500 font-medium">{member.role}</p>
              <p className="text-neutral-600 text-sm">{member.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  