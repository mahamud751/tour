import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { teamMembers } from '@/data/mockData';

export const Team = () => {
  return (
    <div className="container-custom">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="heading-secondary mb-6">
          Meet Our <span className="text-primary-600">Expert Team</span>
        </h2>
        <p className="body-large text-neutral-600">
          Our passionate team of travel experts brings decades of combined experience 
          to craft your perfect journey. We&apos;re here to make your travel dreams a reality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <Card key={member.name} className="card group overflow-hidden hover:shadow-xl transition-all duration-500">
            <CardContent className="p-0">
              {/* Image */}
              <div className="relative h-64 bg-neutral-200 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl text-neutral-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>

                {/* Contact Info */}
                <div className="space-y-2 text-sm text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{member.location}</span>
                  </div>
                </div>

                {/* Contact Button */}
                <Button variant="outline" className="w-full mt-4">
                  Contact {member.name.split(' ')[0]}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};