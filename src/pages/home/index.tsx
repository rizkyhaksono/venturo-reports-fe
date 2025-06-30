import { Link } from 'react-router'
import { BarChart3, TrendingUp, PieChart, FileText, Filter, Download } from 'lucide-react'
import BaseLayout from '@/components/layouts/base-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

function HomePage() {
  const features = [
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Real-time Analytics",
      description: "Monitor sales performance with live data updates across all stores"
    },
    {
      icon: <PieChart className="w-5 h-5" />,
      title: "Payment Tracking",
      description: "Track multiple payment methods including Cash, QRIS, E-Wallet, and more"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Multi-Store Management",
      description: "Analyze sales data across multiple store locations with detailed breakdowns"
    },
    {
      icon: <Filter className="w-5 h-5" />,
      title: "Advanced Filtering",
      description: "Filter by store location, payment method, and categories"
    },
    {
      icon: <Download className="w-5 h-5" />,
      title: "Export Reports",
      description: "Generate and export detailed reports in Excel or PDF formats"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Detailed Insights",
      description: "Get comprehensive insights with item-level and store-level analytics"
    }
  ]

  const stats = [
    { label: "Active Stores", value: "5+" },
    { label: "Payment Methods", value: "5" },
    { label: "Product Items", value: "50+" },
    { label: "Report Accuracy", value: "100%" }
  ]

  return (
    <BaseLayout>
      <div className="container mx-auto max-w-6xl px-4">
        {/* Hero Section */}
        <div className="text-center py-16 md:py-24">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Sales Report Dashboard
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-8">
            Comprehensive sales analytics platform to track, analyze, and optimize your business performance across multiple stores and payment methods.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link to="/sales">
                View Sales Reports
              </Link>
            </Button>
            <Button variant="neutral" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 md:mb-24">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-4 hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none">
              <div className="text-2xl md:text-3xl font-bold text-main mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16 md:mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Everything you need
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              Powerful features to help you manage and analyze your sales data effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all duration-200">
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-main">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-sm">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12 md:py-16 mb-8">
          <Card className="max-w-md mx-auto hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all duration-200">
            <CardContent className="text-center">
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                Ready to get started?
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Start analyzing your sales data today and make data-driven decisions for your business growth.
              </p>
              <Button asChild>
                <Link to="/sales">
                  View Dashboard
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features with Badges */}
        <div className="text-center mb-16">
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge>Real-time Data</Badge>
            <Badge variant="neutral">Multi-Store</Badge>
            <Badge>Export Ready</Badge>
            <Badge variant="neutral">Payment Tracking</Badge>
            <Badge>Analytics</Badge>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default HomePage