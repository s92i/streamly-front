import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/common/Dialog";
import type { FindSessionsByUserQuery } from "@/graphql/generated/output";
import { formateDate } from "@/utils/format-date";
import { useTranslations } from "next-intl";
import type { PropsWithChildren } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface SessionModalProps {
  session: FindSessionsByUserQuery["findSessionsByUser"][0];
}

export function SessionModal({
  children,
  session,
}: PropsWithChildren<SessionModalProps>) {
  const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const t = useTranslations("layout.dashboard.settings.sessions.sessionModal");

  const center: [number, number] = [
    session.metadata.location.latitude,
    session.metadata.location.longitude,
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl">{t("heading")}</DialogTitle>
        <div className="space-y-3">
          <div className="flex items-center">
            <span className="font-medium">{t("device")}</span>
            <span className="ml-2 text-muted-foreground">
              {session.metadata.device.browser}, {session.metadata.device.os}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">{t("location")}</span>
            <span className="ml-2 text-muted-foreground">
              {session.metadata.location.country},{" "}
              {session.metadata.location.city}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">{t("ipAddress")}</span>
            <span className="ml-2 text-muted-foreground">
              {session.metadata.ip}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">{t("createdAt")}</span>
            <span className="ml-2 text-muted-foreground">
              {formateDate(session.createdAt, true)}
            </span>
          </div>
          <div style={{ width: "100%", height: "300px" }}>
            <MapContainer
              center={center}
              zoom={11}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={center} icon={markerIcon}>
                <Popup>
                  {session.metadata.location.city},{" "}
                  {session.metadata.location.country}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
