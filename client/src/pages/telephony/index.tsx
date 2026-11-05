import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTelephony } from '@/hooks/use-telephony';
import {
  Phone,
  Plus,
  CheckCircle2,
  Hash,
  Server,
} from 'lucide-react';

interface ExtendedTrunk {
  id: string;
  name: string;
  provider: string;
  phone_numbers: string[];
  channels: number;
  sip_domain: string;
  inbound_agent: string;
  status: 'online' | 'degraded';
}

const EXTENDED_TRUNKS: ExtendedTrunk[] = [
  {
    id: 'tc_exotel_mumbai_01',
    name: 'India Primary SIP Trunk (Exotel Mumbai DC)',
    provider: 'Exotel',
    phone_numbers: ['+91 22 6982 4400', '+91 22 6982 4401'],
    channels: 50,
    sip_domain: 'mumbai-sip.dograh.ai:5060',
    inbound_agent: 'Customer Support Specialist (Rachel)',
    status: 'online',
  },
  {
    id: 'tc_twilio_bangalore_02',
    name: 'Twilio Cloud Gateway (Bangalore DC)',
    provider: 'Twilio',
    phone_numbers: ['+91 80 4719 3300', '+91 80 4719 3301', '+91 80 4719 3302'],
    channels: 35,
    sip_domain: 'bangalore-edge.dograh.ai:5060',
    inbound_agent: 'Inbound Sales Qualifier (Adam)',
    status: 'online',
  },
  {
    id: 'tc_telnyx_global_03',
    name: 'Telnyx Global Outbound SIP Interconnect',
    provider: 'Telnyx',
    phone_numbers: ['+1 415 800 2911', '+44 20 7946 0192'],
    channels: 100,
    sip_domain: 'global-outbound.dograh.ai:5060',
    inbound_agent: 'Healthcare Appointment Booking (Drew)',
    status: 'online',
  },
];

export default function TelephonyPage() {
  const { data: _configs = [] } = useTelephony();

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Telephony & SIP Trunks
            <span className="text-xs font-mono font-normal text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-full border border-zinc-700/60">
              {EXTENDED_TRUNKS.length} Trunks
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Connect SIP trunks, configure DIDs, and route inbound phone calls directly to ElevenLabs voice agents.
          </p>
        </div>
        <Button
          onClick={() => alert('Add Telephony Trunk modal opened.')}
          className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold gap-1.5 rounded-xl shadow-sm text-xs px-4 py-2"
        >
          <Plus className="h-4 w-4" />
          Add SIP Trunk
        </Button>
      </div>

      {/* Trunks Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {EXTENDED_TRUNKS.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-zinc-800/80 bg-[#111215] hover:border-zinc-700/80 transition-all p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                    <Phone className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white">{t.name}</h3>
                    <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                      Carrier: {t.provider}
                    </div>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className="border-emerald-800/60 text-emerald-400 bg-emerald-950/30 text-[10px] capitalize flex items-center gap-1 font-medium"
                >
                  <CheckCircle2 className="h-3 w-3" />
                  {t.status}
                </Badge>
              </div>

              {/* Trunk Details & Phone Numbers */}
              <div className="mt-5 space-y-3">
                <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-3 space-y-1.5">
                  <div className="text-[11px] text-zinc-400 font-medium flex items-center gap-1.5">
                    <Hash className="h-3 w-3 text-zinc-400" />
                    Assigned DIDs / Numbers
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {t.phone_numbers.map((num) => (
                      <span
                        key={num}
                        className="text-xs font-mono text-zinc-200 bg-zinc-800 px-2 py-0.5 rounded-md border border-zinc-700/50"
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-2.5">
                    <div className="text-[10px] text-zinc-500">Concurrency Capacity</div>
                    <div className="text-xs font-mono text-white font-semibold mt-0.5">
                      {t.channels} Channels
                    </div>
                  </div>
                  <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-2.5">
                    <div className="text-[10px] text-zinc-500">Audio Codec</div>
                    <div className="text-xs font-mono text-cyan-400 font-semibold mt-0.5">
                      G.711u / Opus
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-2.5 text-xs space-y-1">
                  <div className="text-[10px] text-zinc-500">Inbound Routing Target</div>
                  <div className="text-xs text-zinc-200 font-medium truncate">
                    {t.inbound_agent}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="mt-5 flex items-center justify-between border-t border-zinc-800/60 pt-3">
              <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                <Server className="h-3 w-3" />
                {t.sip_domain}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => alert(`Configuring SIP trunk ${t.name}`)}
                className="h-7 text-xs border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-lg px-3"
              >
                Trunk Settings
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
