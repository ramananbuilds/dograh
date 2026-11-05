import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryProvider } from '@/components/providers/query-provider';
import { AuthProvider } from '@/components/providers/auth-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AppLayout } from '@/components/layout/app-layout';

// Pages
import LoginPage from '@/pages/auth/login';
import SignupPage from '@/pages/auth/signup';
import DashboardPage from '@/pages/dashboard';
import AgentsPage from '@/pages/agents';
import CreateAgentPage from '@/pages/agents/create';
import AgentDetailPage from '@/pages/agents/[id]';
import AgentRunsPage from '@/pages/agents/[id]/runs';
import AgentRunDetailPage from '@/pages/agents/[id]/run-detail';
import AgentEmbedPage from '@/pages/agents/[id]/embed';
import AgentSettingsPage from '@/pages/agents/[id]/settings';
import CampaignsPage from '@/pages/campaigns';
import NewCampaignPage from '@/pages/campaigns/new';
import CampaignDetailPage from '@/pages/campaigns/[id]';
import EditCampaignPage from '@/pages/campaigns/[id]/edit';
import ReportsPage from '@/pages/reports';
import UsagePage from '@/pages/usage';
import ConnectionsPage from '@/pages/connections';
import NewConnectionPage from '@/pages/connections/new';
import EditConnectionPage from '@/pages/connections/[id]';
import ModelsPage from '@/pages/models';
import NewModelPage from '@/pages/models/new';
import EditModelPage from '@/pages/models/[id]';
import ToolsPage from '@/pages/tools';
import ToolDetailPage from '@/pages/tools/[id]';
import KnowledgeBasePage from '@/pages/knowledge-base';
import RecordingsPage from '@/pages/recordings';
import CredentialsPage from '@/pages/credentials';
import TelephonyPage from '@/pages/telephony';
import TelephonyDetailPage from '@/pages/telephony/[id]';
import ApiKeysPage from '@/pages/api-keys';
import SettingsPage from '@/pages/settings';

export default function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Auth routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected App Layout */}
              <Route element={<AppLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />

                {/* Agents */}
                <Route path="/agents" element={<AgentsPage />} />
                <Route path="/agents/create" element={<CreateAgentPage />} />
                <Route path="/agents/:id" element={<AgentDetailPage />} />
                <Route path="/agents/:id/runs" element={<AgentRunsPage />} />
                <Route path="/agents/:id/runs/:runId" element={<AgentRunDetailPage />} />
                <Route path="/agents/:id/embed" element={<AgentEmbedPage />} />
                <Route path="/agents/:id/settings" element={<AgentSettingsPage />} />

                {/* Campaigns */}
                <Route path="/campaigns" element={<CampaignsPage />} />
                <Route path="/campaigns/new" element={<NewCampaignPage />} />
                <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
                <Route path="/campaigns/:id/edit" element={<EditCampaignPage />} />

                {/* Analytics & Metrics */}
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/usage" element={<UsagePage />} />

                {/* Voices & Models */}
                <Route path="/connections" element={<ConnectionsPage />} />
                <Route path="/connections/new" element={<NewConnectionPage />} />
                <Route path="/connections/:id" element={<EditConnectionPage />} />
                <Route path="/models" element={<ModelsPage />} />
                <Route path="/models/new" element={<NewModelPage />} />
                <Route path="/models/:id" element={<EditModelPage />} />

                {/* Platform */}
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/tools/:id" element={<ToolDetailPage />} />
                <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
                <Route path="/recordings" element={<RecordingsPage />} />
                <Route path="/credentials" element={<CredentialsPage />} />
                <Route path="/telephony" element={<TelephonyPage />} />
                <Route path="/telephony/:id" element={<TelephonyDetailPage />} />
                <Route path="/api-keys" element={<ApiKeysPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

