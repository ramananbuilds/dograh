import { useParams } from 'react-router-dom';
import { useCampaign } from '@/hooks/use-campaigns';
import { CampaignHeader } from './components/campaign-header';
import { CampaignProgress } from './components/campaign-progress';
import { CampaignStats } from './components/campaign-stats';
import { CampaignRuns } from './components/campaign-runs';
import { LoadingSpinner } from '@/components/shared/loading-spinner';

export default function CampaignDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: campaign, isLoading } = useCampaign(id!);

  if (isLoading) return <LoadingSpinner className="m-auto my-12" />;
  if (!campaign) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-[#111215] p-12 text-center text-zinc-400">
        Campaign not found.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <CampaignHeader campaign={campaign} />
      <div className="grid gap-6 lg:grid-cols-2">
        <CampaignProgress campaign={campaign} />
        <CampaignStats campaignId={id!} />
      </div>
      <CampaignRuns campaignId={id!} />
    </div>
  );
}
