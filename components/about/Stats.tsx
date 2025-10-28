import { stats } from "@/data/mockData";

export const Stats = () => {
  return (
    <div className="container-custom">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="heading-secondary mb-6">
          Why <span className="text-primary-600">Travelers Choose</span> Next Go
        </h2>
        <p className="body-large text-neutral-600">
          Trusted by thousands of travelers worldwide, we&apos;re committed to
          delivering exceptional experiences and creating memories that last a
          lifetime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="text-center group p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-8 h-8 text-white" />
              </div>

              <div className="text-3xl font-heading font-bold text-primary-600 mb-2">
                {stat.number}
              </div>

              <h3 className="font-heading font-semibold text-neutral-800 mb-2">
                {stat.label}
              </h3>

              <p className="text-sm text-neutral-600 leading-relaxed">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
