import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { SidebarMenuItem } from "@/components/ui/sidebar";

export default function SettingsPage() {
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
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start bg-muted hover:bg-muted">
                  Profile
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start hover:bg-transparent hover:underline">
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

        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Profile</h3>
              <p className="text-sm text-muted-foreground">
                This is how others will see you on the site.
              </p>
            </div>
            
            <Separator />

            <form className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="shadcn"
                  name="username"
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
                    />
                    <Input
                      defaultValue="http://twitter.com/shadcn"
                      name="urls.1.value"
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

              <Button type="submit">Update profile</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
