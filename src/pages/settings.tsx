import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { useState } from "react";

// Profile Form Component
const ProfileForm = () => {
  return (
    <form className="space-y-8 w-full">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder="shadcn"
          name="username"
          className="w-full"
        />
        <p className="text-[0.8rem] text-muted-foreground">
          This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a verified email to display" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="m@example.com">m@example.com</SelectItem>
            <SelectItem value="m@google.com">m@google.com</SelectItem>
            <SelectItem value="m@support.com">m@support.com</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-[0.8rem] text-muted-foreground">
          You can manage verified email addresses in your <a href="/examples/forms" className="underline">email settings</a>.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us a little bit about yourself"
          name="bio"
          defaultValue="I own a computer."
          className="w-full"
        />
        <p className="text-[0.8rem] text-muted-foreground">
          You can <span className="font-medium">@mention</span> other users and organizations to link to them.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">URLs</Label>
          <p className="text-[0.8rem] text-muted-foreground">
            Add links to your website, blog, or social media profiles.
          </p>
          <div className="space-y-2">
            <Input
              id="url"
              defaultValue="https://shadcn.com"
              name="urls.0.value"
              className="w-full"
            />
            <Input
              defaultValue="http://twitter.com/shadcn"
              name="urls.1.value"
              className="w-full"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            type="button"
          >
            Add URL
          </Button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Update profile</Button>
      </div>
    </form>
  );
};

// Account Form Component
const AccountForm = () => {
  return (
    <form className="space-y-8 w-full">
      <div className="space-y-2">
        <Label htmlFor="current-password">Current Password</Label>
        <Input
          id="current-password"
          type="password"
          name="currentPassword"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-password">New Password</Label>
        <Input
          id="new-password"
          type="password"
          name="newPassword"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password" 
          name="confirmPassword"
          className="w-full"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Change Password</Button>
      </div>
    </form>
  );
};
// Settings Sidebar Component
const SettingsSidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  return (
    <aside className="-mx-4 lg:w-1/5">
      <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => setActiveTab('profile')}
              className={`w-full justify-start ${activeTab === 'profile' ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline'}`}
            >
              Profile
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => setActiveTab('account')}
              className={`w-full justify-start ${activeTab === 'account' ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline'}`}
            >
              Account
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start hover:bg-transparent hover:underline">
              Appearance
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start hover:bg-transparent hover:underline">
              Notifications
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start hover:bg-transparent hover:underline">
              Display
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </nav>
    </aside>
  );
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 w-full">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 lg:max-w-full">
          <div className="space-y-6">
            {activeTab === 'profile' ? (
              <>
                <div>
                  <h3 className="text-lg font-medium">Profile</h3>
                  <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                  </p>
                </div>
                
                <Separator />

                <ProfileForm />
              </>
            ) : activeTab === 'account' ? (
              <>
                <div>
                  <h3 className="text-lg font-medium">Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Update your account settings and change your password here.
                  </p>
                </div>

                <Separator />

                <AccountForm />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
