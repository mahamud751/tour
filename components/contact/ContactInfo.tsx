import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { contactMethods, businessHours } from '@/data/mockData';

export const ContactInfo = () => {
  return (
    <div className="space-y-6">
      {/* Contact Methods */}
      <div className="grid gap-4">
        {contactMethods.map((method) => {
          const Icon = method.icon;
          return (
            <Card key={method.title} className="card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gray-50 ${method.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-lg text-neutral-800 mb-1">
                      {method.title}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-2">
                      {method.description}
                    </p>
                    <p className="font-medium text-neutral-800 mb-3">
                      {method.details}
                    </p>
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                      {method.action} →
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Business Hours */}
      <Card className="card">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-primary-500" />
            <h3 className="font-heading font-semibold text-lg">Business Hours</h3>
          </div>
          
          <div className="space-y-3">
            {businessHours.map((schedule) => (
              <div key={schedule.day} className="flex justify-between items-center py-2 border-b border-neutral-100 last:border-0">
                <span className="text-neutral-700 font-medium">{schedule.day}</span>
                <span className="text-neutral-600">{schedule.hours}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-amber-800 text-sm">
              <strong>Emergency Support:</strong> Available 24/7 for active travelers
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Response */}
      <Card className="card border-green-200 bg-green-50">
        <CardContent className="p-6">
          <h3 className="font-heading font-semibold text-green-800 mb-2">
            Fast Response Guarantee
          </h3>
          <ul className="space-y-2 text-green-700 text-sm">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span>Response within 2 hours during business hours</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span>24/7 emergency support for active trips</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span>Dedicated travel expert assigned to your inquiry</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};