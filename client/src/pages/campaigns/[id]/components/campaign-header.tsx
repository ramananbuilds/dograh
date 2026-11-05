import { Link } from 'react-router-dom';
import { Campaign } from '@/types/campaign';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, ArrowLeft, Download, RotateCcw, ShieldCheck } from 'lucide-react';
import { useCampaigns } from '@/hooks/use-campaigns';

export function CampaignHeader({ campaign }: { campaign: Campaign }) {
  const { startCampaign, pauseCampaign } = useCampaigns();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-6">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Link to="/campaigns" className="hover:text-zinc-200 flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            Campaigns
          </Link>
          <span>/</span>
          <span className="font-mono text-zinc-500">{campaign.id}</span>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-white">{campaign.name}</h1>
          <Badge
            variant="outline"
            className={`text-xs capitalize font-medium ${
              campaign.status === 'running'
                ? 'border-emerald-800/60 text-emerald-400 bg-emerald-950/30'
                : campaign.status === 'paused'
                ? 'border-amber-800/60 text-amber-400 bg-amber-950/30'
                : 'border-zinc-800 text-zinc-400 bg-zinc-900/40'
            }`}
          >
            {campaign.status}
          </Badge>
          <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-zinc-400" />
            DND Compliant (TRAI India)
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-zinc-800 bg-[#111215] text-zinc-300 hover:bg-zinc-800 hover:text-white text-xs h-8 rounded-xl gap-1.5"
          onClick={() => {
            alert('Downloading campaign execution CSV report...');
          }}
        >
          <Download className="h-3.5 w-3.5 text-zinc-400" />
          Export Report
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="border-zinc-800 bg-[#111215] text-zinc-300 hover:bg-zinc-800 hover:text-white text-xs h-8 rounded-xl gap-1.5"
          onClick={() => {
            alert('Redial queued for 32 unanswered/voicemail leads.');
          }}
        >
          <RotateCcw className="h-3.5 w-3.5 text-zinc-400" />
          Redial Unanswered
        </Button>

        {campaign.status === 'running' ? (
          <Button
            size="sm"
            onClick={() => pauseCampaign(campaign.id)}
            className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold text-xs h-8 rounded-xl gap-1.5 px-3.5 shadow-sm"
          >
            <Pause className="h-3.5 w-3.5" />
            Pause Campaign
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={() => startCampaign(campaign.id)}
            className="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs h-8 rounded-xl gap-1.5 px-3.5 shadow-sm"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            Start Campaign
          </Button>
        )}
      </div>
    </div>
  );
}
